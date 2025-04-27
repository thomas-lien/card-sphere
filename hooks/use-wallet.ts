"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import { useState } from 'react'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      await open()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    if (isLoading) return
    try {
      setIsLoading(true)
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    address: address || undefined,
    isConnected: Boolean(isConnected && address),
    isLoading,
    connect: handleConnect,
    disconnect: handleDisconnect,
  }
} 