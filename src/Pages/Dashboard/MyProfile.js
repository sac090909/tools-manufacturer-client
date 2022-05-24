import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);

  const email = user?.email;

  const { data: profile, isLoading } = useQuery(["myProfile", email], () =>
    fetch(`http://localhost:5001/myprofile/${email}`).then((res) => res.json())
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="overflow-x-auto mx-2">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="py-10"></th>
            <th>Info Type</th>
            <th>Info Detail</th>
            <th>Update Info</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Name</td>
            <td>{profile?.displayName}</td>
            <td>
              <div>
                <button className="btn btn-disabled">Update</button>
              </div>
            </td>
          </tr>

          {/* <tr>
            <th>2</th>
            <td>E-mail</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr> */}

          <tr>
            <th>3</th>
            <td>Phone</td>
            <td>{profile?.phone}</td>
            <td>
              <div>
                <button className="btn btn-black">Update</button>
              </div>
            </td>
          </tr>

          {/* <tr>
            <th>4</th>
            <td>Address</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>

          <tr>
            <th>5</th>
            <td>Education</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>

          <tr>
            <th>6</th>
            <td>Social Profile</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>

          <tr>
            <th>7</th>
            <td>Comment</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default MyProfile;
