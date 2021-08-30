import Head from 'next/head'
import Landing from '../components/Landing'

export default function Home() {
  return (
    <div className="" >
      <Head>
        <title>BIZNET</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing/>
    </div>
  )
}

