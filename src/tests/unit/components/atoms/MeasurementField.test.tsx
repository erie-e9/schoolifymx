import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MeasurementField from '@components/atoms/MeasurementField';

describe('MeasurementField', () => {
  const defaultProps = {
    label: 'Weight',
    value: 50,
    min: 0,
    max: 100,
    onChange: vi.fn(),
  };

  it('renders label correctly', () => {
    render(<MeasurementField {...defaultProps} />);
    expect(screen.getByText('Weight')).toBeInTheDocument();
  });

  it('renders prefix when provided', () => {
    render(<MeasurementField {...defaultProps} prefix="KG" />);
    expect(screen.getByText('KG.')).toBeInTheDocument();
  });

  it('renders tooltip when tooltipContent is provided', () => {
    const { container } = render(<MeasurementField {...defaultProps} tooltipContent="Helpful info" />);
    // Tooltip renders an Info icon (SVG element)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render tooltip when tooltipContent is not provided', () => {
    render(<MeasurementField {...defaultProps} />);
    // Should not have tooltip content
    const label = screen.getByText('Weight');
    expect(label).toBeInTheDocument();
  });

  it('displays current value in number input', () => {
    render(<MeasurementField {...defaultProps} value={75} />);
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toHaveValue(75);
  });

  it('displays current value in range slider', () => {
    render(<MeasurementField {...defaultProps} value={75} />);
    const rangeInput = screen.getByRole('slider') as HTMLInputElement;
    expect(rangeInput.value).toBe('75');
  });

  it('calls onChange when number input changes', () => {
    const handleChange = vi.fn();
    render(<MeasurementField {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '80' } });
    expect(handleChange).toHaveBeenCalledWith(80);
  });

  it('calls onChange when range slider changes', () => {
    const handleChange = vi.fn();
    render(<MeasurementField {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: 60 } });
    expect(handleChange).toHaveBeenCalledWith(60);
  });

  it('handles empty input as 0', () => {
    const handleChange = vi.fn();
    render(<MeasurementField {...defaultProps} onChange={handleChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '' } });
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('applies custom step when provided', () => {
    render(<MeasurementField {...defaultProps} step={0.5} />);
    const numberInput = screen.getByRole('spinbutton');
    const rangeInput = screen.getByRole('slider');
    expect(numberInput).toHaveAttribute('step', '0.5');
    expect(rangeInput).toHaveAttribute('step', '0.5');
  });

  it('applies min and max to range input', () => {
    render(<MeasurementField {...defaultProps} min={10} max={90} />);
    const rangeInput = screen.getByRole('slider') as HTMLInputElement;
    expect(rangeInput.min).toBe('10');
    expect(rangeInput.max).toBe('90');
  });

  it('renders with proper label styling', () => {
    const { container } = render(<MeasurementField {...defaultProps} />);
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-text-muted');
  });

  it('renders number input with proper styling', () => {
    const { container } = render(<MeasurementField {...defaultProps} />);
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toHaveClass('text-right');
    expect(numberInput).toHaveClass('outline-none');
    expect(numberInput).toHaveClass('border-b');
  });

  it('renders range input with proper styling', () => {
    const { container } = render(<MeasurementField {...defaultProps} />);
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toHaveClass('w-full');
    expect(rangeInput).toHaveClass('h-1');
    expect(rangeInput).toHaveClass('bg-gray-100');
  });
});
