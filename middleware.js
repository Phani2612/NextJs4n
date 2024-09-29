// import { NextResponse } from 'next/server';

// export function middleware(req) {
//     const { pathname } = req.nextUrl;

//     // Check if the request is for /teeevo
//     if (pathname.startsWith('/teeevo')) {
//         // const newPath = `/apps/teeevo/pages/index.js`;


//         const newPath = `https://testing-mocha-eight.vercel.app/`;

//         console.log('Newpath' , newPath)

//         return NextResponse.rewrite(new URL(newPath, req.url));
//     }

//     return NextResponse.next();
// }


// //If we need to use middleware , we need to use the above code and also next.config.mjs

// //If we use only redirect concept , we can simple use the next.config.mjs