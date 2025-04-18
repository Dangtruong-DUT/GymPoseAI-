import { useContext, useMemo, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NavigationBar from '@/src/components/NavigationBar'
import { RootStackScreenProps } from '@/src/navigation/types'
import { categories, workoutHistory } from '@/src/types/workoutHistory.type'
import { ViewModeType } from '@/src/components/WorkoutChart'
import TabBar from './Components/TabBar'
import FilterBar from './Components/FilterBar'
import { PaginationMeta, QueryConfigWorkoutHistory, ResponseApi } from '@/src/types/utils.type'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import workoutHistoryApi from '@/src/apis/workoutHistory.api'
import { AppContext } from '@/src/Contexts/App.context'
import TrainingSessionCard from '@/src/components/TrainingSessionCard'
import Loader from '@/src/components/Loader'
import LoaderModal from '@/src/components/LoaderModal'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'

function WorkoutHistoryCenter({ navigation }: RootStackScreenProps<'WorkoutHistoryCenter'>) {
    const { profile } = useContext(AppContext)
    const [category, setCategory] = useState<categories>('full body')
    const [viewMode, setViewMode] = useState<ViewModeType>('weekly')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    const queryConfig = useMemo<QueryConfigWorkoutHistory>(
        () => ({
            page: 1,
            limit: 10,
            category,
            viewMode,
            sort_by: 'createAt',
            order
        }),
        [category, viewMode, order]
    )

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery<
        ResponseApi<workoutHistory[], PaginationMeta>,
        Error
    >({
        queryKey: ['workout-history-screen', category, viewMode, order],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await workoutHistoryApi.getWorkoutHistory({
                params: { ...queryConfig, page: pageParam as number },
                user_id: profile?.id || ''
            })
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { current_page, total_page } = lastPage.meta
            return current_page < total_page ? current_page + 1 : undefined
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5
    })

    const workouts = data?.pages.flatMap((page) => page.data) || []

    const handleTabChange = (value: string) => {
        setCategory(value as categories)
    }
    const handleViewModeChange = (value: string) => {
        setViewMode(value as ViewModeType)
    }
    const handleOrderChange = () => {
        setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
    }
    const goBackScreen = () => navigation.goBack()
    const handleWorkoutCardClick = (workoutId: string) => {
        navigation.navigate('WorkoutHistoryDetail', { workout_id: workoutId })
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <NavigationBar
                    title={'Workout History'}
                    callback={goBackScreen}
                    buttonBackStyle={styles.buttonBackScreen}
                    headingStyle={styles.headerTitle}
                    iconColor='#FFF'
                />
            </SafeAreaView>
            <View style={styles.mainContent}>
                <View style={styles.sidebar}>
                    {/* Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                        <TabBar activeTab={category} onChangeTab={handleTabChange} />
                    </ScrollView>
                    {/* Filters */}
                    <View style={styles.filters}>
                        <TouchableOpacity style={styles.priceFilter} onPress={handleOrderChange}>
                            <Text style={styles.priceFilterText}>Sort</Text>
                            <Ionicons
                                name={order === 'asc' ? 'chevron-up' : 'chevron-down'}
                                size={16}
                                color='#93A7FE'
                            />
                        </TouchableOpacity>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.durationFiltersContainer}
                        >
                            <FilterBar activeFilterProp={viewMode} onChangeFilter={handleViewModeChange} />
                        </ScrollView>
                    </View>
                </View>

                {/* Workout List */}
                {isLoading && <LoaderModal title='Loading' />}
                <FlatList
                    data={workouts}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={styles.packageList}
                    renderItem={({ item }) => (
                        <TrainingSessionCard item={item} onPress={() => handleWorkoutCardClick(item.id)} />
                    )}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
                    }}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <View style={styles.loadingWrapper}>
                                <Loader />
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    )
}

export default WorkoutHistoryCenter

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#92A3FD' },
    header: {
        height: 100
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700'
    },
    buttonBackScreen: {
        backgroundColor: 'transparent',
        color: '#FFF'
    },
    sidebar: {
        marginBottom: 6
    },
    tabsContainer: {
        height: 40,
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        marginBottom: 4
    },
    filters: {
        paddingVertical: 10,
        paddingLeft: 16,
        paddingRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#FFF',
        width: WINDOW_WIDTH * 0.9,
        alignSelf: 'center',
        borderRadius: 8
    },
    priceFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    priceFilterText: {
        color: '#4b5563'
    },
    durationFiltersContainer: {},
    mainContent: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 25,
        marginTop: 8,
        paddingTop: 16
    },
    packageList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 16
    },
    loadingWrapper: {
        alignItems: 'center',
        paddingVertical: 12
    }
})
