'use client'

import { MessageDto } from '@/types';
import { Avatar, Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Key, useCallback, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { deleteMessage } from '../actions/messageActions';
import { id } from 'date-fns/locale';
import { truncateString } from '@/lib/util';

type Props = {
    messages: MessageDto[];
}

export default function MessageTable({ messages }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter();
    const isOutbox = searchParams.get('container') === 'outbox';
    const [isDeleting, setDeleting] = useState({ id: '', loading: false });

    const columns = [
        { key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender' },
        { key: 'text', label: 'Message' },
        { key: 'created', label: isOutbox ? 'Date send' : 'Date received' },
        { key: 'actions', label: 'Actions' }
    ];


    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({ id: message.id, loading: true });
        await deleteMessage(message.id, isOutbox);
        router.refresh();
        setDeleting({ id: '', loading: false });
    }, [isOutbox, router]);

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + '/chat');
    };

    const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case 'recipientName':
            case 'senderName':
                return (
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Avatar
                            alt='Image of member'
                            src={(isOutbox ? item.recipientImage : item.senderImage) || '/images/user.png'}
                        />
                        <span>{cellValue}</span>
                    </div>
                );
            case 'text':
                return (
                    <div>
                        {truncateString(cellValue)}
                    </div>
                );
            case 'created':
                return cellValue;
            default:
                return (
                    <Button
                        isIconOnly variant='light'
                        onClick={() => handleDeleteMessage(item)}
                        isLoading={isDeleting.id === item.id && isDeleting.loading}
                    >
                        <AiFillDelete size={24} className='text-danger' />
                    </Button>
                )
        }

    }, [isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage]);

    return (
        <Table
            aria-label='Table with messages'
            selectionMode='single'
            onRowAction={(key) => handleRowSelect(key)}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={messages} emptyContent='No messages for this container'>
                {(item) => (
                    <TableRow key={item.id} className='cursor-pointer'>
                        {(columnKey) => (
                            <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                {renderCell(item, columnKey as keyof MessageDto)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
