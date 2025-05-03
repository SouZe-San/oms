import { Button } from "@oms/ui/button";
import { CountButton } from "@oms/ui/countButton";
import TempoCount from "../components/TempoCount";

const Home = () => {
  return (
    <div className="">
      <h1 className="text-2xl bg-blue-400 text-center">User</h1>
      <div className="flex justify-center mt-5">
        <Button appName="user" className="bg-black text-xl text-amber-50 p-2 rounded-2xl cursor-pointer">
          Open alert
        </Button>
      </div>

      <div className="flex justify-center mt-16 gap-5 items-center">
        <TempoCount />
        <CountButton className="">
          Upgrade
        </CountButton>
      </div>
    </div>
  );
};

export default Home;
