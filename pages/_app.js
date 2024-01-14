import "../styles/globals.css";
import Header from './Components/Header'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
       <>
       <meta title="Writtech AI Video" description="Writtech AI Video"></meta>
       <section className="relative">
          <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-10 lg:py-10">
            <Header />
            <Component {...pageProps} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639174a3de7d11bdf3ccbf01_Frame%20427322885.svg" alt="" className="absolute bottom-[auto] left-[auto] right-[0%] top-[0%] -z-10 inline-block max-[767px]:hidden" />
        </section >
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XE6LC3GS0V"></Script>
      <Script id='google-tab' dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
      
              gtag('config', 'G-XE6LC3GS0V');
                        `,
      }}>
      </Script>
      </>
  );
}
