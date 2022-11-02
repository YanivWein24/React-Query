import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user, isLoading: isLoadingUsers } = useQuery(
    ["user", email],
    () => fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId; // using '?' because it may take some time to receive the user data
  const id = user?.data.id; // using '?' because it may take some time to receive the user data
  const { data: channel, isLoading: isLoadingUsersChannels } = useQuery(
    ["channel", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, // start whenever we receive value for 'channelId'
    }
  );
  const courses = channel?.data.courses;

  if (isLoadingUsers || isLoadingUsersChannels) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Dependent Queries Page</h2>
      <h3>User:</h3>
      {id}
      <br />
      {channelId}
      <h3>Channels:</h3>
      {courses.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </>
  );
};
