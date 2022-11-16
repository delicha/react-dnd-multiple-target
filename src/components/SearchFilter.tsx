import { useState, FC } from "react";
import "./SearchFilter.css";

interface SearchFilterProps {
  containers: IContainer[];
}

const SearchFilter: FC<SearchFilterProps> = (
  {
    containers,
  }
  ) => {

  const TagData = [
    {id: "1", name: "tag1"},
    {id: "2", name: "tag2"},
    {id: "3", name: "tag3"},
    {id: "4", name: "tag4"},
    {id: "5", name: "tag5"},
    {id: "6", name: "tag6"},
    {id: "7", name: "tag7"},
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

  const onAddTagFromList = (e: any) => {
    console.log(e.currentTarget.getAttribute("data-item"));
    const tagtext = e.currentTarget.getAttribute("data-item");
    const newTags = [...tags];
    newTags.push(tagtext);
    setTags(newTags);
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-box">
        <button className="search-filter-button" onClick={ShowTagFilter}>タグで検索する</button>
        {showTagFilter ? (
            <>
              <div className="tag-created">{tags?.join(" / ")}</div>
              <input 
                id="tags"
                type="text"
                onChange={(e) => filterTags(e.target.value)}
                className="search-filter-input"
              />
              <ul>
                {/* {containers.map((container) => (
                    container.items.map((item) => (
                      item.tags?.map((tag:string, i:number) => {
                        return (
                          <li onClick={onAddTagFromList} key={tag} data-item={tag}>
                              {tag}
                          </li>
                        )
                      })
                    ))
                  ))} */}
                {tags.map(tag => {
                  return (
                    <li onClick={onAddTagFromList} data-item={tag.name}>
                      {tag.name}
                    </li>
                  )
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
