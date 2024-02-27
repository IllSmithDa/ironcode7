import './Loader.css'
export default function Loader({
  loadingMsg,
  width,
}: {
  loadingMsg ?: string,
  width ?: number
}) {
  return (
    <section
      className='bg-[#E5E5E5] dark:bg-[#333] h-[400px] flex justify-center flex-col items-center
        lg:h-[600px]
      '
      style={{ width }}
    >
      <h2>{loadingMsg}</h2>
      <div className='loader'></div>
    </section>
  )
}
