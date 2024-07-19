'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      // Handle sign-in error (e.g., display error message to the user)
      console.error(result.error);
    } else {
      // Redirect to the home page on successful sign-in
      router.push('/');
    }

    setLoginInProgress(false);
  }

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 justify-center"
        >
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login With Google
        </button>
      </form>
    </section>
  );
}
