import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;  // Secret key, .env dosyasından alıyoruz

export default async function authMiddleware(request: NextRequest) {
    try {
        
        const token = request.headers.get('Authorization')?.split(' ')[1];

        if (token===undefined) {
            return new NextResponse(JSON.stringify({ message: 'Token not found' }), { status: 401 });
        }

        

        const secretKey = new TextEncoder().encode(JWT_SECRET); 
        const { payload } = await jwtVerify(token, secretKey);

        const response = NextResponse.next();
        response.headers.set('userId', payload.userId as string);

        return response;  // Yanıtı döndür
    } catch (err:any) {
        return new NextResponse(JSON.stringify({ message: 'Error in auth middleware: ' + err.message }), { status: 500 });
    }
}

export const config = {
    matcher: ['/api/notes/:path*','/api/logedinCheck/:path*','/api/note/:path*'], 
};
