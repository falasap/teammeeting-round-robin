import { useState, useEffect, useCallback } from 'react'
import { Button, Card, Title, Tag } from '@sap-ui/fx-components'
import { Play, Pause, SkipForward, User, Clock } from 'lucide-react'

// Team members in alphabetical order
const TEAM_MEMBERS = [
  'Agnes',
  'Alex',
  'Alexandra',
  'Anita',
  'Antonio',
  'Bela',
  'Eric',
  'Fabian',
  'Khalid',
  'Lars',
  'Lea',
  'Markus',
  'Nobi',
  'Ran',
  'Robin',
  'Scott',
  'Suja',
  'Zisa',
  'Zsuzsa',
].sort()

const TIMER_DURATION = 5 * 60 // 5 minutes in seconds
const STORAGE_KEY = 'teammeeting-round-robin-state'

interface AppState {
  currentIndex: number
  lastUpdated: string
}

function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const state: AppState = JSON.parse(saved)
        return state.currentIndex
      } catch {
        return 0
      }
    }
    return 0
  })

  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [hasPlayedSound, setHasPlayedSound] = useState(false)

  useEffect(() => {
    const state: AppState = {
      currentIndex,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [currentIndex])

  // Play sound when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !hasPlayedSound) {
      // Create and play a beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800 // Frequency in Hz
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)

      setHasPlayedSound(true)
    }
  }, [timeLeft, hasPlayedSound])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1) // Continue counting into negative
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const handleSkip = useCallback(() => {
    const nextIndex = (currentIndex + 1) % TEAM_MEMBERS.length
    setCurrentIndex(nextIndex)
    setTimeLeft(TIMER_DURATION)
    setIsRunning(false)
    setHasPlayedSound(false) // Reset sound flag
  }, [currentIndex])

  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const currentPerson = TEAM_MEMBERS[currentIndex]
  const nextPerson = TEAM_MEMBERS[(currentIndex + 1) % TEAM_MEMBERS.length]
  const isOvertime = timeLeft < 0
  const absTimeLeft = Math.abs(timeLeft)
  const minutes = Math.floor(absTimeLeft / 60)
  const seconds = absTimeLeft % 60
  const displayTime = `${isOvertime ? '-' : ''}${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--color-neutral-50) 0%, var(--color-neutral-100) 100%)',
      padding: '40px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card style={{
        maxWidth: '700px',
        width: '100%',
        padding: '48px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Title level="1" style={{ marginBottom: '8px', color: 'var(--color-brand-purple)' }}>
            Team Meeting Round Robin
          </Title>
          <div style={{ fontSize: '14px', color: 'var(--color-neutral-600)' }}>
            Each person has 5 minutes to present
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-purple-600) 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(93, 54, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <User size={20} color="white" />
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Now Presenting
            </span>
          </div>
          <div style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '24px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            {currentPerson}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: isOvertime ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '16px 32px',
            borderRadius: '12px',
            border: isOvertime ? '2px solid #DC2626' : '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Clock size={24} color={isOvertime ? '#FEE2E2' : 'white'} />
            <div style={{
              fontSize: '48px',
              fontWeight: '700',
              color: isOvertime ? '#FEE2E2' : 'white',
              fontFamily: 'monospace',
              letterSpacing: '2px'
            }}>
              {displayTime}
            </div>
          </div>

          {isOvertime && (
            <div style={{ marginTop: '16px' }}>
              <Tag design="Negative">Time's Up!</Tag>
            </div>
          )}
        </div>

        <div style={{
          backgroundColor: 'var(--color-neutral-100)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--color-neutral-200)'
        }}>
          <div>
            <div style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-neutral-600)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Up Next
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--color-neutral-800)'
            }}>
              {nextPerson}
            </div>
          </div>
          <Tag design="Information">Get Ready</Tag>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <Button
            icon={isRunning ? <Pause size={20} /> : <Play size={20} />}
            design="Emphasized"
            onClick={handleStartPause}
          >
            {isRunning ? 'Pause' : 'Start Timer'}
          </Button>

          <Button
            icon={<SkipForward size={20} />}
            onClick={handleSkip}
          >
            Skip to Next
          </Button>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: 'var(--color-neutral-50)',
          borderRadius: '12px'
        }}>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-neutral-600)',
            marginBottom: '8px'
          }}>
            Progress: {currentIndex + 1} of {TEAM_MEMBERS.length}
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--color-neutral-200)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${((currentIndex + 1) / TEAM_MEMBERS.length) * 100}%`,
              height: '100%',
              backgroundColor: 'var(--color-brand-purple)',
              transition: 'width 0.3s ease',
              borderRadius: '4px'
            }} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
