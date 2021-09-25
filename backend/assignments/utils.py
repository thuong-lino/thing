# find highest grade of an assignment
def highest_SRQs_grade(queryset):
    queryset = queryset.order_by('-assignment', 'SRQs_grade')
    dict_q = {}
    for each in queryset:
        dict_q[each.assignment] = each

    result = []
    for assignment in dict_q.values():
        result.append(assignment)
    return result
