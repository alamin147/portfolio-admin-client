import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DeleteSkill = () => {
  const [allSkill, setAllSkill]: any = useState();
  useEffect(() => {
    fetch(`https://server-mocha-tau.vercel.app/skill`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAllSkill(result);
      });
  }, []);

  const deleteSkill = (id: string) => {
    console.log(id);

    fetch(`https://server-mocha-tau.vercel.app/skill/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      // body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result?.acknowledged == true) {
          toast.success("Deleted Successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Fail to Delete", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };
  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold">
        Delete blog
      </h1>

      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Skill Image
              </th>
              <th scope="col" className="px-6 py-3">
                Skill Name
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allSkill?.map((singleBlog: any) => {
              return (
                <tr
                  key={singleBlog?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10"
                      src={singleBlog?.imgUrl}
                      alt=""
                    />
                  </th>
                  <td className="px-6 py-4">{singleBlog?.title}</td>
                  <td className="px-6 py-4">
                    <Button onClick={() => deleteSkill(singleBlog?._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DeleteSkill;



