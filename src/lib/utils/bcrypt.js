import bcrypt from 'bcryptjs'

const hashing = (password) => bcrypt.hash(password, 10);

const matchPassword = async (password, hashPassword) => {
    const match = await bcrypt.compare(password, hashPassword);
    if (match) {
        return true;
    }
    return false;
};

export { hashing, matchPassword };