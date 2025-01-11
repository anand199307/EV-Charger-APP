export  const forgotPasswordTmp = (token: any) =>{
    return `
    <p>You have requested a password reset. Click the button below to reset your password:</p>
    <a href="${process.env.UI_URL}/resetPassword?token=${token}" style="text-decoration: none;">
        <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
            Reset Password
        </button>
    </a>
    `
} 

export  const welcomeTemp = (accountName: any) =>{
    return `
    <p>You have added as admin for this ${accountName} . Click the button below to reset your password:</p>
    <a href="${process.env.UI_URL}/login" style="text-decoration: none;">
        <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
           Login
        </button>
    </a>
    `
} 