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
      className='loading-container bg-[#E5E5E5] dark:bg-[#333]'
      style={{ width }}
    >
      <h2>{loadingMsg}</h2>
      <div className='loader'></div>
    </section>
  )
}
