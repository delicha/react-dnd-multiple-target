import { useState, FC } from "react";
import "./SearchFilter.css";

interface SearchFilterProps {
  // items: IItem[];
}

const SearchFilter: FC<SearchFilterProps> = () => {

  const TagData = [
    {id: 1, name: "tag1"},
    {id: 2, name: "tag2"},
    {id: 3, name: "tag3"},
    {id: 4, name: "tag4"},
    {id: 5, name: "tag5"},
    {id: 6, name: "tag6"},
    {id: 7, name: "tag7"},
  ]

  const [tags, setTags] = useState(TagData);

  const filterTags = (e: any) => {
    const search = e.toLowerCase();
    const filterTags = TagData.filter(tags => tags.name.toLowerCase().includes(search));
    setTags(filterTags);
  }

  const [showTagFilter, setShowTagFilter] = useState(false);

  const ShowTagFilter = () => {
    setShowTagFilter(true);
  };

  const SearchTasks = () => {
    setShowTagFilter(false);
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-box">
        <button className="search-filter-button" onClick={ShowTagFilter}>タグで検索する</button>
        {showTagFilter ? (
            <>
              <input 
                id="tags"
                type="text"
                onChange={(e) => filterTags(e.target.value)}
                className="search-filter-input"
              />
              <ul>
                {tags.map(tag => {
                  return <li key={tag.id}><button>{tag.name}</button></li>
                })}
              </ul>
              <button className="search-filter-button" onClick={SearchTasks}>検索</button>
            </>
          ) : (
            <>
            </>
          )
        }
      </div>
    </div>
  );
};
export default SearchFilter;
