from rest_framework.pagination import PageNumberPagination
# https://www.django-rest-framework.org/api-guide/pagination/

class LargeResultsSetPagination(PageNumberPagination):
    # A string value indicating the name of the query parameter to use for the pagination control.
    page_query_param = 'page'
    # If set, this is a string value indicating the name of a query parameter that allows 
    # the client to set the page size on a per-request basis. Defaults to None, 
    # indicating that the client may not control the requested page size.
    page_size_query_param = 'page_size'
    # If set, this is a numeric value indicating the maximum allowable requested page size. 
    # This attribute is only valid if page_size_query_param is also set.
    # Upper boundary for the number of items per one page.
    max_page_size = 100