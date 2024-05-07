import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

export const SignInPage = () => {
  return (
    <main className='bg-white w-full h-auto mx-auto max-w-4xl'>
      <section className='relative w-full h-full left-1/2 top-20 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center justify-center'>
        <div className='w-full flex items-center gap-3 px-10'>
          <Link to={"/"}>
            <button className='w-full flex items-center gap-3 bg-gray-500 rounded-lg py-2 px-5'>
              <IoIosArrowRoundBack className='w-6 h-6' />
              <span className='font-medium'>Back to Home</span>
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
