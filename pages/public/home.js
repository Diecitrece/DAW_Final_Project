export default function LoadBook() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/books`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    });
    if (loading) {
      return <p>Cargando...</p>;
    }
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    const styles = {};
    //show the book details with the book cover, title, author, and description with tailwind classes
    return (
      <>
        <div className="">
          <p>Hola</p>
        </div>
      </>
    );
  }