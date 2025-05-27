import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface CPProfile {
  _id: string;
  platform: string;
  username: string;
  rating?: string;
  solved?: string;
  highestRating?: string;
  rank?: string;
  logo?: string;
  link?: string;
}

const ListCP = () => {
  const [profiles, setProfiles] = useState<CPProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all CP profiles
    fetch("https://admin-server-portfolio.vercel.app/cpProfile")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("No data returned from server");
        }
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CP profiles:", error);
        toast.error(`Failed to fetch CP profiles: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      fetch(`https://admin-server-portfolio.vercel.app/cpProfile/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
          }
          return res.json();
        })
        .then((result) => {
          if (result?.deletedCount > 0) {
            toast.success("CP profile deleted successfully");
            // Remove the deleted profile from state
            setProfiles(profiles.filter((profile) => profile._id !== id));
          } else {
            toast.error("Failed to delete CP profile");
          }
        })
        .catch((error) => {
          console.error("Error deleting CP profile:", error);
          toast.error(`Failed to delete CP profile: ${error.message}`);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="bg-slate-400 text-center py-12 text-3xl font-bold">
        Manage CP Profiles
      </h1>

      <div className="my-6 text-center">
        <Link
          to="/home/create-cp"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create New CP Profile
        </Link>
      </div>

      <div className="container mx-auto px-4 my-8">
        {profiles.length === 0 ? (
          <p className="text-center text-xl">No CP profiles found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Platform</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">Rating</th>
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">
                      {profile.platform}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {profile.username}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {profile.rating || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {profile.rank || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/home/update-cp/${profile._id}`}
                          className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(profile._id)}
                          className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCP;
