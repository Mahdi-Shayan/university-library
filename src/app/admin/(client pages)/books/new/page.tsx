import BookForm from "@/components/admin/BookForm";
import GoBackButton from "@/components/admin/GoBackButton";

function New() {
  return (
    <>
      <section className="w-full max-w-2xl">
        <GoBackButton />
        <BookForm />
      </section>
    </>
  );
}

export default New;
