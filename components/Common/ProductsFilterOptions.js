import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";

const ProductsFilterOptions = ({ onClick, pagination }) => {
  const router = useRouter();

  const handleGrid = (evt, e) => {
    onClick(e);
    let i, aLinks;

    aLinks = document.getElementsByTagName("a");
    for (i = 0; i < aLinks.length; i++) {
      aLinks[i].className = aLinks[i].className.replace("active", "");
    }

    evt.currentTarget.className += " active";
  };

  const handlePageChange = page => {
    const { query: { query, category } } = router;
    if(query) {
      router.push(`/catalog-search/${query}?page=${page}`);
    } else {
      router.push(`/products-list/${category}?page=${page}`);
    }
  };

  return (
    <div className="products-filter-options">
      <div className="row align-items-center">
        <div className="col d-flex">
          <span>View:</span>

          <div className="view-list-row">
            <div className="view-column">
              <Link href="#">
                <a
                  className="icon-view-two"
                  onClick={e => {
                    e.preventDefault();
                    handleGrid(e, "products-col-two");
                  }}
                >
                  <span></span>
                  <span></span>
                </a>
              </Link>

              <Link href="#">
                <a
                  className="icon-view-three active"
                  onClick={e => {
                    e.preventDefault();
                    handleGrid(e, "");
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </Link>

              <Link href="#">
                <a
                  className="icon-view-four"
                  onClick={e => {
                    e.preventDefault();
                    handleGrid(e, "products-col-four");
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col d-flex justifu-content-end gm-pagination">
          <Pagination
            activePage={pagination.current}
            itemsCountPerPage={12}
            totalItemsCount={pagination.total}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsFilterOptions;
