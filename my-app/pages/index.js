import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import { useState } from 'react'

let web3Modal
if(typeof window !== 'undefined'){
  web3Modal = new Web3Modal({
    network: 'mumbai',
    providerOptions: {},
    disableInjectedProvider: false
  })
}

export default function Home() {

  const [walletConnected,setWalletConnected] = useState(false)

  const connectWallet = async(needSigner=false) => {
    try {
      const instance = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(instance)
      const {chainId} = await provider.getNetwork()
      if(chainId!==80001){
        window.alert("connect with polygon mumbai testnet")
      }
      if(needSigner){
        const signer = await provider.getSigner()
        setWalletConnected(true)
        return signer
      }
      setWalletConnected(true)
        return provider
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ENS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={connectWallet} >Connect Wallet</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
