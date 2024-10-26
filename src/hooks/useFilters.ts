import { usePathname, useRouter } from "next/navigation";
import { FaFemale, FaMale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect } from "react";
import { Selection } from '@nextui-org/react';

export const useFilters = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { filters, setFilters } = useFilterStore();

    const { ageRange, gender, orderBy } = filters;

    useEffect(() => {
        const searchParams = new URLSearchParams();

        if (gender) searchParams.set('gender', gender.join(','));
        if (ageRange) searchParams.set('ageRange', ageRange.toString());
        if (orderBy) searchParams.set('orderBy', orderBy);

        router.replace(`${pathname}?${searchParams}`);
    }, [gender, ageRange, orderBy, router, pathname]);

    const orderByList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' }
    ];

    const gendersList = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ];

    const handleAgeSelect = (value: number[]) => {
        setFilters('ageRange', value);
    };

    const handleOrderSelect = (value: Selection) => {
        if (value instanceof Set) {
            setFilters('orderBy', value.values().next().value as string);
        }
    };

    const handleGenderSelect = (value: string) => {
        if (gender.includes(value)) {
            setFilters('gender', gender.filter(g => g !== value));
        } else {
            setFilters('gender', [...gender, value]);
        }
    };

    return {
        orderByList,
        gendersList,
        filters,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect
    }
}