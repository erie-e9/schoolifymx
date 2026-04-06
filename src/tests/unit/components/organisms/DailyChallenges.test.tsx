import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DailyChallenges from '@components/organisms/DailyChallenges';
import { useChallenges } from '@hooks/useChallenges';
import { WhatsAppService } from '@services/WhatsAppService';

// Mock useChallenges hook
vi.mock('@hooks/useChallenges', () => ({
  useChallenges: vi.fn()
}));

// Mock WhatsAppService
vi.mock('@services/WhatsAppService', () => ({
  WhatsAppService: {
    sendMissionRedemption: vi.fn(),
  },
}));

describe('DailyChallenges', () => {
  const mockChallenges = [
    {
      id: '1',
      title: 'Complete 5 tasks',
      description: 'Finish all daily tasks',
      icon: '🏆',
      current: 5,
      target: 5,
      completed: true,
    },
    {
      id: '2',
      title: 'Read 10 pages',
      description: 'Read from your book',
      icon: '📖',
      current: 3,
      target: 10,
      completed: false,
    },
  ];

  const defaultMock = {
    challenges: mockChallenges,
    completedCount: 1,
    hasNewCompletion: false,
    setHasNewCompletion: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useChallenges).mockReturnValue(defaultMock as any);
    vi.stubGlobal('alert', vi.fn());
  });

  it('renders challenges title', () => {
    render(<DailyChallenges isOpen={true} />);
    expect(screen.getByText('Misiones')).toBeInTheDocument();
  });

  it('renders progress counter and items', () => {
    render(<DailyChallenges isOpen={true} />);
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.getByText('Complete 5 tasks')).toBeInTheDocument();
  });

  it('handles reward redemption with completed missions', () => {
    render(<DailyChallenges isOpen={true} />);
    const claimBtn = screen.getByText('Canjear recompensas');
    fireEvent.click(claimBtn);
    expect(WhatsAppService.sendMissionRedemption).toHaveBeenCalledWith([
      { title: 'Complete 5 tasks' }
    ]);
  });

  it('shows alert when redeeming with no missions completed', () => {
    vi.mocked(useChallenges).mockReturnValue({
      ...defaultMock,
      challenges: mockChallenges.map(c => ({ ...c, completed: false })),
      completedCount: 0
    } as any);

    render(<DailyChallenges isOpen={true} />);
    const claimBtn = screen.getByText('Canjear recompensas');
    fireEvent.click(claimBtn);
    expect(window.alert).toHaveBeenCalledWith("Completa al menos una misión para canjear recompensas.");
  });

  it('renders balloon notification when hasNewCompletion is true', () => {
    vi.mocked(useChallenges).mockReturnValue({
      ...defaultMock,
      hasNewCompletion: true
    } as any);

    render(<DailyChallenges isOpen={false} />);
    expect(screen.getByText('¡Misión Cumplida!')).toBeInTheDocument();
  });

  it('opens panel when clicking balloon notification', async () => {
    const setHasNewCompletion = vi.fn();
    vi.mocked(useChallenges).mockReturnValue({
      ...defaultMock,
      hasNewCompletion: true,
      setHasNewCompletion
    } as any);

    render(<DailyChallenges isOpen={false} />);
    const balloon = screen.getByText('¡Misión Cumplida!');
    fireEvent.click(balloon);

    expect(await screen.findByText('Misiones')).toBeInTheDocument();
    expect(setHasNewCompletion).toHaveBeenCalledWith(false);
  });

  it('closes when close button is clicked', () => {
    const onClose = vi.fn();
    render(<DailyChallenges isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(onClose).toHaveBeenCalled();
  });

  it('verifies progress bar width', () => {
    render(<DailyChallenges isOpen={true} />);
    const progressBars = document.querySelectorAll('.h-full.bg-secondary');
    expect(progressBars[0]).toHaveStyle({ width: '100%' });
    expect(progressBars[1]).toHaveStyle({ width: '30%' });
  });

  it('has memoization applied', () => {
    expect((DailyChallenges as any).type || (DailyChallenges as any).displayName).toBeDefined();
  });
});
