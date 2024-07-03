import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const CreateBlog = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    fetch("https://server-mocha-tau.vercel.app/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result?.acknowledged == true) {
          toast.success("Blog created", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
        }
      });
  };

  const inputFields = [
    { label: "Title", reg: "title", type: "text" },
    { label: "Category", reg: "category", type: "text" },
    { label: "Image Url", reg: "imgUrl", type: "text" },
    { label: "Description", reg: "des", type: "text" },
  ];

  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold">
        Create blog
      </h1>
      <section className="bg-gray-50 mb-10 mt-16 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                {/* title, img, short des, big des, img1, img2, img3, live link, github link, tech[3] */}

                {inputFields?.map((field: any, i) => {
                  return (
                    <div key={i}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {" "}
                        {field.label}
                      </label>
                      <input
                        {...register(`${field.reg}`, { required: true })}
                        type={field.type}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                      />
                      {errors.reg && (
                        <p className="text-red-500">{field.reg} is required.</p>
                      )}
                    </div>
                  );
                })}

                <button
                  type="submit"
                  className="w-full text-black bg-slate-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CreateBlog;
