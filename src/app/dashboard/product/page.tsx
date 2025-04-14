import { Form } from './components/form'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'

export default async function Product() {
  const token = await getCookieServer(); 

  if (!token) {
    throw new Error("Token não encontrado, acesso não autorizado.");
  }

  // Faça a requisição para obter categorias
  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return <Form categories={response.data} />;
}
