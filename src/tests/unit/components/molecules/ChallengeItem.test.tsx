import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Trophy } from 'lucide-react';
import ChallengeItem from '@components/molecules/ChallengeItem';

describe('ChallengeItem', () => {
  const completedChallenge = {
    id: '1',
    title: 'Complete 5 tasks',
    description: 'Finish all daily tasks',
    icon: <Trophy data-testid="challenge-icon" />,
    current: 5,
    target: 5,
    completed: true,
  };

  const pendingChallenge = {
    id: '2',
    title: 'Read 10 pages',
    description: 'Read from your book',
    icon: <Trophy data-testid="challenge-icon" />,
    current: 3,
    target: 10,
    completed: false,
  };

  it('renders challenge title', () => {
    render(<ChallengeItem challenge={completedChallenge} />);
    expect(screen.getByText('Complete 5 tasks')).toBeInTheDocument();
  });

  it('renders challenge description', () => {
    render(<ChallengeItem challenge={completedChallenge} />);
    expect(screen.getByText('Finish all daily tasks')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<ChallengeItem challenge={completedChallenge} />);
    expect(screen.getByTestId('challenge-icon')).toBeInTheDocument();
  });

  it('shows completed state with CheckCircle2', () => {
    render(<ChallengeItem challenge={completedChallenge} />);
    expect(screen.getByText('Complete 5 tasks')).toBeInTheDocument();
  });

  it('shows pending state with Circle', () => {
    render(<ChallengeItem challenge={pendingChallenge} />);
    expect(screen.getByText('Read 10 pages')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<ChallengeItem challenge={pendingChallenge} />);
    expect(screen.getByText('3 / 10')).toBeInTheDocument();
  });

  it('applies completed styles when challenge is completed', () => {
    const { container } = render(<ChallengeItem challenge={completedChallenge} />);
    expect(container.firstChild).toHaveClass('bg-primary/5');
    expect(container.firstChild).toHaveClass('border-primary/20');
  });

  it('applies pending styles when challenge is not completed', () => {
    const { container } = render(<ChallengeItem challenge={pendingChallenge} />);
    expect(container.firstChild).toHaveClass('bg-gray-50');
  });

  it('has proper card styling', () => {
    const { container } = render(<ChallengeItem challenge={completedChallenge} />);
    expect(container.firstChild).toHaveClass('rounded-2xl');
    expect(container.firstChild).toHaveClass('border');
  });
});
