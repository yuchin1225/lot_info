import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import pool from "@/app/lib/dbPool";
const db = pool.promise();

export async function GET() {
    try {
        const [queryRows] = await db.execute<RowDataPacket[]>(
            `SELECT name, current, total, rmk as remark FROM lot_info WHERE lotid = ?`,
            ['P543']
        );

        if (queryRows[0]) {

            const newData = queryRows.map(item => ({
                name: item.name,
                available: Number(item.total) - Number(item.current),
                occupied: Number(item.current),
                total: Number(item.total),
                remark: item.remark
            }));

            return NextResponse.json({ data: { ...newData[0] } });
        } else {
            return NextResponse.json({ data: null }, { status: 404 });
        }
    } catch (error: unknown) {
        if (error instanceof NextResponse) {
            return error;
        }

        // 確保 error 是 Error 類型（有 message 屬性）
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // fallback：萬一 error 不是 Error，也不是 NextResponse，就直接丟出 generic 錯誤
        return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
}