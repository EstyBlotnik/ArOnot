import useDay from "@/app/store/currentDayStore";
import Image from "next/image";

const LooksList: React.FC<{ saveChanges: () => void, changed:boolean, setChanged:(c: boolean) => void }> = ({ saveChanges, changed, setChanged }) => {
    const { selectedLooks, selectLook } = useDay();

    return (
        <div className="flex flex-col h-full gap-6 px-3">
            {/* הצגת הלוקים הנבחרים */}
            <div className="flex  gap-3 justify-center">
                {selectedLooks.map((look) => (
                    <div
                        key={look?._id || look.id}
                        className="border border-gray-300 rounded-lg p-2 max-w-[80px] text-center cursor-pointer transition-all duration-300 hover:scale-105"
                        onClick={() => {console.log("function select book");console.log("changed", changed, "clicked", look);setChanged(true);selectLook(look)}} // הפעלת פונקציית selectLook
                    >
                        <Image
                            src={look.img}
                            alt={`look ${look.id}`}
                            width={80}
                            height={80}
                            className="w-full h-auto rounded-lg mb-2"
                        />
                    </div>
                ))}
            </div>
            {/* {changed &&  */}
            <button
                disabled={!changed}
                className={`py-2 px-4 rounded-lg transition-all duration-300 self-end mt-auto w-full 
                  ${changed ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                onClick={() => {
                    saveChanges();
                    setChanged(false);
                }}
            >
                שמור שינויים
            </button>
            {/* } */}
        </div>
    );
};

export default LooksList;
