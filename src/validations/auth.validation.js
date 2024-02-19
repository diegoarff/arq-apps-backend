import { z } from 'zod';
import { username, password, role } from './generics.js';

export const registerSchema = z.object({
	username,
	password,
	role,
});

export const loginSchema = z.object({
	username,
	password,
});