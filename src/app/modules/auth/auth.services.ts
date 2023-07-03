import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  //check user existance using instance methods
  const user = new User();
  const isUserExists = await user.isUserExists(id);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  //match password
  if (
    isUserExists?.password &&
    !(await user.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  //create access token and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExists;
  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!');
  }
  const { userId, role } = verifiedToken;
  //what to do when the user is deleted but he has the refresh token?
  //Checking deleted users refresh token
  const user = new User();
  const isUserExists = user.isUserExists(userId);
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User doesnot exixts');
  }
  //if user exists generate a new token

  const newAccessToken = jwtHelper.createToken(
    {
      id: userId,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  //check user existance using instance methods
  const userInstance = new User();
  const isUserExists = await userInstance.isUserExists(user?.userId);
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }
  // ckeck old password
  if (
    isUserExists?.password &&
    !(await user?.isPasswordMatched(oldPassword, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }
  //hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  // update password and other fields
  await User.findOneAndUpdate(
    { id: user?.UserId },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      paswordChangedAt: new Date(),
    }
  );
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
