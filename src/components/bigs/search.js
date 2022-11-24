import React, { useContext } from "react";
import { HiSearch } from "react-icons/hi";
import discussionContext from "../../contexts/discussion";

export default function Search() {
  const { setAllMember, allMember } = useContext(discussionContext);

  return (
    <div className="search_div">
      <input
        type="search"
        onChange={(e) => {
          const alter = allMember;
          let arr = [];
          arr = alter.filter((disc) => {
            const str = disc.membres
              ? disc.membres[0].fullName
              : `${disc.firstName} ${disc.secondName}`;
            if (str.indexOf(e.target.value) !== -1) return disc;
          });
          if (e.target.value.length === 0) setAllMember(allMember);
          setAllMember(arr);
        }}
      />
      <HiSearch size="25px" color="#0000007e" />
    </div>
  );
}
