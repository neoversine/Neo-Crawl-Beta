import Image from 'next/image'
import React from 'react'

const Clients = () => {
    return (
        <div className='w-full py-28'>
            <div className='max-w-7xl w-full mx-auto'>
                <div className='grid grid-cols-2 py-5 min-h-[6dvh] xl:min-h-[18dvh]'>
                    <div className='col-span-2 lg:col-span-1 flex justify-center xl:justify-start items-center w-full'>
                        <h1 className='py-5 font-bold text-4xl text-center xl:text-start tracking-wider leading-[90%] bg-[radial-gradient(circle,black,#6c6c6c)] bg-clip-text text-transparent '>
                            Trusted by innovators, <br />powering data-driven decisions.
                        </h1>
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className='grid grid-cols-3 gap-1'>
                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c1.png'} alt='finnofarms' width={100} height={80} className='mx-auto' />
                            </div>

                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c2.png'} alt='finnofarms' width={50} height={80} />
                            </div>
                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c1.png'} alt='finnofarms' width={100} height={80} />
                            </div>

                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c2.png'} alt='finnofarms' width={50} height={80} />
                            </div>
                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c1.png'} alt='finnofarms' width={100} height={80} />
                            </div>

                            <div className='col-span-1 flex items-center justify-center'>
                                <Image src={'/landing/c2.png'} alt='finnofarms' width={50} height={80} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clients