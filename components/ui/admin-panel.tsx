'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminPanelProps {
  isAuthenticated: boolean;
}

/**
 * AdminPanel Component
 * 
 * A fixed-position admin control panel that provides:
 * - Hidden login trigger button (low opacity) when not authenticated
 * - Login form with password input when triggered
 * - Resume download and logout buttons when authenticated
 * 
 * Requirements: 5.4, 5.5
 */
export function AdminPanel({ isAuthenticated }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Reload page to update authentication state
        window.location.reload();
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // Reload page to update authentication state
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
      setIsLoading(false);
    }
  };

  const handleDownloadResume = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/resume/download');
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Melnar_Cordova_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        setError('Failed to download resume');
      }
    } catch (err) {
      setError('Download failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && password && !isLoading) {
      handleLogin();
    }
  };

  // Authenticated state: show resume download and logout buttons
  if (isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 flex gap-2 z-50" role="region" aria-label="Admin controls">
        <Button
          onClick={handleDownloadResume}
          disabled={isLoading}
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Download resume PDF"
        >
          {isLoading ? 'Downloading...' : 'Download Resume'}
        </Button>
        <Button
          onClick={handleLogout}
          disabled={isLoading}
          variant="outline"
          aria-label="Logout from admin panel"
        >
          Logout
        </Button>
        {error && (
          <div className="sr-only" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
      </div>
    );
  }

  // Login form visible: show password input and action buttons
  if (showLogin) {
    return (
      <div 
        className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 bg-background border border-border rounded-lg p-4 shadow-lg"
        role="region"
        aria-label="Admin login form"
      >
        {error && (
          <p className="text-sm text-red-500" role="alert" aria-live="assertive">{error}</p>
        )}
        <div className="flex gap-2">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Admin password"
            className="w-40"
            disabled={isLoading}
            autoFocus
            aria-label="Admin password"
            aria-required="true"
          />
          <Button
            onClick={handleLogin}
            disabled={!password || isLoading}
            aria-label="Submit login"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <Button
            onClick={() => {
              setShowLogin(false);
              setPassword('');
              setError('');
            }}
            variant="ghost"
            disabled={isLoading}
            aria-label="Cancel login"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Default state: show hidden admin trigger button with low opacity
  return (
    <Button
      onClick={() => setShowLogin(true)}
      variant="ghost"
      size="sm"
      className="fixed bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity z-50"
      aria-label="Open admin login"
    >
      Admin
    </Button>
  );
}
