import SideBar from "components/elements/SideBar";

const BaseLayout = ({ children }: any) => {
  return (
    <main className="h-screen w-screen">
      <section className="w-full h-full min-h-screen">
        <div className="w-full h-auto flex bg-[#EFF1F4]">
          <SideBar />
          <div className="flex-1 p-6">{children}</div>
        </div>
      </section>
    </main>
  );
};

export default BaseLayout;
