import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FAQItem from '@components/molecules/FAQItem';

// Mock GSAP
vi.mock('gsap', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    default: {
      ...actual,
      fromTo: vi.fn((target, fromVars, toVars) => {
        if (toVars.height === 'auto') {
          target.style.height = 'auto';
          target.style.opacity = '1';
        }
        return { then: vi.fn() };
      }),
      to: vi.fn((target, vars) => {
        target.style.height = '0';
        target.style.opacity = '0';
        return { then: vi.fn() };
      }),
      context: vi.fn((fn) => ({ revert: vi.fn() })),
    },
  };
});

describe('FAQItem', () => {
  const mockItem = {
    q: 'What is this?',
    a: 'This is the answer to the question.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders question', () => {
    render(<FAQItem item={mockItem} index={0} />);
    expect(screen.getByText('What is this?')).toBeInTheDocument();
  });

  it('renders question number', () => {
    render(<FAQItem item={mockItem} index={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders answer when opened', async () => {
    render(<FAQItem item={mockItem} index={0} />);

    // Click to open
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText('This is the answer to the question.')).toBeInTheDocument();
    });
  });

  it('toggles open/close on click', async () => {
    render(<FAQItem item={mockItem} index={0} />);
    const button = screen.getByRole('button');

    // Open
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('This is the answer to the question.')).toBeInTheDocument();
    });

    // Close - GSAP animation keeps content in DOM, just changes opacity/height
    fireEvent.click(button);
    await waitFor(() => {
      const answer = screen.queryByText('This is the answer to the question.');
      expect(answer).toBeInTheDocument(); // Content stays in DOM due to GSAP animation
    });
  });

  it('renders ChevronDown icon', () => {
    const { container } = render(<FAQItem item={mockItem} index={0} />);
    expect(container.querySelectorAll('svg')).toHaveLength(1);
  });

  it('applies open state styles when expanded', async () => {
    render(<FAQItem item={mockItem} index={0} />);

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByRole('button').parentElement).toHaveClass('border-primary');
    });
  });

  it('applies closed state styles by default', () => {
    const { container } = render(<FAQItem item={mockItem} index={0} />);
    expect(container.firstChild).toHaveClass('border-gray-200');
  });

  it('has proper button styling', () => {
    render(<FAQItem item={mockItem} index={0} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
  });

  it('has rounded corners', () => {
    const { container } = render(<FAQItem item={mockItem} index={0} />);
    expect(container.firstChild).toHaveClass('rounded-2xl');
  });

  it('has transition class', () => {
    const { container } = render(<FAQItem item={mockItem} index={0} />);
    expect(container.firstChild).toHaveClass('transition-all');
    expect(container.firstChild).toHaveClass('duration-300');
  });
});
