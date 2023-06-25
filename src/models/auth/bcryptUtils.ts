import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
   
    
    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    if (isMatch) {
      console.log('Passwords match');
    } else {
      console.log('Passwords do not match');
    }
    return isMatch;
  };
  
  