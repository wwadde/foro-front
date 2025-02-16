
type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
}

interface ForumProps {
    userLogged?: boolean;
  }
  
  export default function Forum({ userLogged }: ForumProps) {
  const dummyPosts: Post[] = [
    {
      id: 1,
      title: "¿Cuál es tu lenguaje de programación favorito?",
      author: "Juan Dev",
      date: "2024-02-20",
      content: "Me gustaría saber qué lenguajes de programación prefieren y por qué...",
      replies: 15
    },
    {
      id: 2,
      title: "Mejores prácticas en React",
      author: "Ana Code",
      date: "2024-02-19",
      content: "Compartamos las mejores prácticas que utilizamos en React...",
      replies: 23
    },
    {
      id: 3,
      title: "Debate: Frontend vs Backend",
      author: "Carlos Full",
      date: "2024-02-18",
      content: "¿Qué prefieren y por qué? Compartamos experiencias...",
      replies: 45
    }
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Temas de Discusión</h2>
        {userLogged && (
          <button className="btn btn-primary">Nuevo Tema</button>
        )}
      </div>
      <div className="list-group">
        {dummyPosts.map(post => (
          <div key={post.id} className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{post.title}</h5>
              <small>{post.date}</small>
            </div>
            <p className="mb-1">{post.content}</p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">Por: {post.author}</small>
              <span className="badge bg-primary rounded-pill">{post.replies} respuestas</span>
            </div>
            {userLogged && (
              <button className="btn btn-sm btn-outline-primary mt-2">Responder</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}