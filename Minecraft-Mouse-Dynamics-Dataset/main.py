import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.fft import fftn, fftshift

# Step 1: Load Mouse Movement Data
def load_mouse_data(csv_file):
    # Load CSV data
    data = pd.read_csv(csv_file)
    # Ensure the columns are x, y, and timestamp
    x = data['X'].values
    y = data['Y'].values
    t = data['Timestamp'].values
    return x, y, t

# Step 2: Preprocess Data (normalize time and coordinates)
def preprocess_data(x, y, t):
    # Normalize the coordinates and timestamps
    x = (x - np.min(x)) / (np.max(x) - np.min(x))
    y = (y - np.min(y)) / (np.max(y) - np.min(y))
    t = (t - np.min(t)) / (np.max(t) - np.min(t))
    return x, y, t

# Step 3: Generate 3D Grid (x, y, t)
def create_3d_grid(x, y, t, grid_size=64):
    # Interpolate the data into a regular 3D grid
    x_idx = (x * (grid_size - 1)).astype(int)
    y_idx = (y * (grid_size - 1)).astype(int)
    t_idx = (t * (grid_size - 1)).astype(int)
    
    # Create an empty 3D grid
    grid = np.zeros((grid_size, grid_size, grid_size))

    # Place movement data in the grid
    for xi, yi, ti in zip(x_idx, y_idx, t_idx):
        grid[xi, yi, ti] += 1  # Increment for every movement
    
    return grid

# Step 4: Apply 3D Fourier Transform
def compute_3d_fft(grid):
    # Perform 3D Fourier Transform
    fft_result = fftn(grid)
    # Shift zero frequency components to the center
    fft_shifted = fftshift(fft_result)
    # Return magnitude (for visualization purposes)
    magnitude = np.abs(fft_shifted)
    return magnitude

# Step 5: Generate a 3D Spectrogram
def generate_spectrogram(magnitude, threshold=0.1):
    # Threshold for visibility
    magnitude[magnitude < threshold] = 0
    return magnitude

# Step 6: Save the Spectrogram
def save_spectrogram(spectrogram, output_file='3d_spectrogram.npy'):
    # Save the 3D spectrogram as a numpy file for further analysis
    np.save(output_file, spectrogram)
    print(f'Spectrogram saved as {output_file}')

# Optional: Visualize a slice of the 3D spectrogram
def visualize_slice(spectrogram, axis=0, slice_idx=32):
    # Display a 2D slice from the 3D spectrogram along the specified axis
    if axis == 0:
        plt.imshow(spectrogram[slice_idx, :, :], cmap='inferno')
    elif axis == 1:
        plt.imshow(spectrogram[:, slice_idx, :], cmap='inferno')
    else:
        plt.imshow(spectrogram[:, :, slice_idx], cmap='inferno')
    plt.colorbar()
    plt.title(f'Slice along axis {axis} at index {slice_idx}')
    plt.show()

# Main function to process the mouse movement data
def main(csv_file):
    # Load and preprocess mouse movement data
    x, y, t = load_mouse_data(csv_file)
    x, y, t = preprocess_data(x, y, t)
    
    # Create a 3D grid of movements
    grid = create_3d_grid(x, y, t)
    
    # Compute the 3D Fourier Transform
    fft_magnitude = compute_3d_fft(grid)
    
    # Generate a 3D spectrogram
    spectrogram = generate_spectrogram(fft_magnitude)
    
    # Save the 3D spectrogram
    save_spectrogram(spectrogram)
    
    # Visualize a slice of the spectrogram (optional)
    visualize_slice(spectrogram, axis=2, slice_idx=32)

# Run the pipeline
if __name__ == '__main__':
    # Provide the path to your CSV file containing mouse movements
    csv_file = '10extracted/Subject0_raw.csv'
    main(csv_file)
