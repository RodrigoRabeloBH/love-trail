import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import CardInnerWrapper from '@/components/CardInnerWrapper';
import MemberPhotos from '@/components/MemberPhotos';

export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(params.userId);

    return (
        <CardInnerWrapper
            header='Photos'
            body={<MemberPhotos photos={photos!} />}
        />
    )
}
