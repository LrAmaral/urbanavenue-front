const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

const createUser = async (userData: {
  name: string;
  email: string;
  role: string;
  addresses: Address[];
}): Promise<User> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar usuário");
  }

  return res.json();
};

export default createUser;
