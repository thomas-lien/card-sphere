"use client"

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { ReactNode } from 'react'

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable')
}

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Configure chains & providers
const chains = [sepolia]
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [w3mProvider({ projectId })]
)

// Set up wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient
})

// Set up modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {children}
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
        defaultChain={sepolia}
      />
    </>
  )
} 