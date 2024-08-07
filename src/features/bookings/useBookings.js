import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { BOOKING_PAGE_CONTENT_AMOUNT } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // CABINFILTER
  const cabinFilterValue = searchParams.get("cabin");
  const cabinFilter =
    !cabinFilterValue || cabinFilterValue === "all"
      ? null
      : { field: "cabinId", value: Number(cabinFilterValue) };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, order] = sortByRaw.split("-");
  const sortBy = { field, order };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // ACTUAL FETCHING
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, cabinFilter, sortBy, page],
    queryFn: () => getBookings({ filter, cabinFilter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / BOOKING_PAGE_CONTENT_AMOUNT);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, cabinFilter, sortBy, page + 1],
      queryFn: () =>
        getBookings({ filter, cabinFilter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, cabinFilter, sortBy, page - 1],
      queryFn: () =>
        getBookings({ filter, cabinFilter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count, error };
};
