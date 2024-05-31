const formInfo = [
  { id: 1, title: "Your Name", placeholder: "Your Name", name: "name" },
  {
    id: 1,
    title: "Photo Url",
    placeholder: "Your Photo Url",
    name: "photoUrl",
  },
  { id: 1, title: "Your Email", placeholder: "Your Email", name: "email" },
  {
    id: 1,
    title: "Password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

const LogInPage = () => {
  return (
    <section>
      <div>
        <form>
          <div>
            <label
              htmlFor="name"
              className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
            >
              Your Name
            </label>
            <input
              id="name"
              className="bg-transparent text-[#4A4E4B] border border-[#051F0D] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              placeholder="Full Name"
              required
              type="text"
              name="name"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogInPage;
