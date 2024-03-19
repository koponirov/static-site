const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
    try {
        const auth = new GoogleAuth({
            keyFile: '/home/mikhail/Downloads/service-account-keys/web-push-70b46-e51c955f5efc.json',
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        console.log('Access token:', accessToken);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getAccessToken();
