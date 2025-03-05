import Form from "./Form";
import ContactDetails from "./ContactDetails";
const Details = () => {
  return (
    <>
      <section className="bg-[#F2F2F2] section-spacing overflow-hidden">
        <div className="container">
          <div className="grid sm:grid-cols-2 xl:grid-cols-12 xl:gap-[60px] lg:gap-[40px] items-start ">
            <div className="xl:col-span-5 col-span-full mr-6">
              <ContactDetails />
            </div>
            <div className="xl:col-span-7 col-span-full xl:pl-[30px] lg:pl-[0]">
              <Form />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Details;
