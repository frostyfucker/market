import { render, screen, fireEvent } from '@testing-library/react';
import ImageUploader from './ImageUploader';
import api from '../services/api';

jest.mock('../services/api');

describe('ImageUploader', () => {
  it('should render the image uploader with input fields', () => {
    render(<ImageUploader />);
    expect(screen.getByLabelText(/garment image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/label image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload images/i })).toBeInTheDocument();
  });

  it('should call api.post on form submission', async () => {
    api.post.mockResolvedValueOnce({ status: 201, data: { message: 'Images uploaded successfully' } });

    render(<ImageUploader />);
    const form = screen.getByRole('form'); // Get the form element

    const garmentInput = screen.getByLabelText(/garment image/i);
    const labelInput = screen.getByLabelText(/label image/i);

    fireEvent.change(garmentInput, { target: { files: [new File([], 'garment.jpg')] } });
    fireEvent.change(labelInput, { target: { files: [new File([], 'label.jpg')] } });

    fireEvent.submit(form); // Submit the form

    // Expect api.post to have been called
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/inventory/upload', expect.any(FormData), expect.any(Object));
  });
});